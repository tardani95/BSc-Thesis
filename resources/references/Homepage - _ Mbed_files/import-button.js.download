function ImportButton(root, opts) {
  var defaults = {
    compiler_import_url: "",
    clone_url: "",
    is_library: false,
    last_used_workspace: {
      type: "compiler",
      c9_workspace: "",
      c9_is_public: true,
      callback: null
    },
    access_token: "",
    cli_enabled: false,
    c9_enabled: true
  }
  opts = $.extend({}, defaults, opts);

  // Default state
  this.state = {
    collapsed: true,
    workspaces: [],
    c9status: ImportButton.c9status.UNKNOWN,
    c9idx: 5,
    action: {},
    userChangedIDE: false,

    access_token: opts.access_token,
    signed_id: '',
  }

  this.setState = function(o, trigerUpdate) {
    if (trigerUpdate == null) {
      trigerUpdate = true;
    }
    var prevState = this.state;
    this.state = $.extend({}, this.state, o);
    if (trigerUpdate) {
      this.onNewState(prevState, this.state);
    }
  }.bind(this);

  this.initialize = function() {

    // Get token, if it doesn't exist
    if (this.state.access_token === "") {
      $.ajax({
        url: '/api/v3/userinfo/?format=json&signed_id=true',
        dataType: 'json'
      })
      .done(this.handleAccessToken)
      .fail(function() { this.setState({ c9status: ImportButton.c9status.INVALID }) }.bind(this))
    }

    // Register clipboard listeners
    new Clipboard('.clippy-btn');

    // Set workspace from params as state
    this.setState({
      action: opts.last_used_workspace
    });

  }.bind(this);

  this.fetchWorkspaces = function() {
    // Do async request to c9, getting latest project/workspaces
    $.ajax({
      url: 'https://api.c9.io/user/projects',
      data: { access_token: this.state.access_token },
      dataType: 'json'
    })
    .done(this.handleNewWorkspaces)
    .fail(function() {
      this.setState({
        c9status: ImportButton.c9status.INVALID
      })
    }.bind(this))

  }

  this.conditionalRenderDropdown = function(state) {
    // Re-render the content of dropdown if dropdown opens
    if (!state.collapsed) {
      if (this.state.c9status !== ImportButton.c9status.INVALID) {
        this.fetchWorkspaces();
      }
    }
    // Initial render, whilst waiting for request to complete
    this.renderDropdown();
  }

  this.getCookie = function(name) {
    if(document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(name + "=");
      if(c_start != -1) {
        c_start = c_start + name.length + 1;
        var c_end = document.cookie.indexOf(";", c_start);
        if(c_end == -1) c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start,c_end));
      }
    }
    return "";
  }

  this.onNewState = function(prevState, newState) {
    if (prevState.access_token !== newState.access_token) {
      this.conditionalRenderDropdown(newState);
    }

    if (prevState.collapsed != newState.collapsed) {
      $("#dropdown-content").toggle();
      this.conditionalRenderDropdown(newState);
    }

    if (prevState.c9idx !== newState.c9idx) {
      this.renderDropdown();
    }

    if (prevState.c9status !== newState.c9status) {
      this.renderDropdown();
    }

    // If the action component changes it means we've changed IDE preference
    if (JSON.stringify(prevState.action) !== JSON.stringify(newState.action) || newState.userChangedIDE) {
      this.setState({ collapsed: true }, false);
      this.render();
      // Check if we're on the initial render, in which case this state change isn't that important
      if (newState.userChangedIDE) {
        this.setState({
          userChangedIDE: false
        }, false);

        // Save the fact that we changed IDE by posting to API
        var c9_workspace = (newState.action.type === "cloud9") ? newState.action.c9_workspace : "";
        var c9_is_public = (newState.action.type === "cloud9") ? newState.action.c9_is_public : true;
        $.ajax({
          url: '/api/v3/userinfo/',
          data: JSON.stringify({
            "profile": {
              "default_editor": newState.action.type,
              "default_c9_workspace": c9_workspace,
              "c9_workspace_is_public": c9_is_public
            }
          }),
          type: "PATCH",
          contentType: "application/json; charset=utf-8",
          dataType: 'json',
          headers: {
            "X-CSRFToken": this.getCookie("csrftoken")
          }
        })

        // Now we just emulate the click on the button
        $('#import-button-action')[0].click();
      }
    }

  }.bind(this);

  this.handleToggleClick = function(e) {
    this.setState({
      collapsed: !this.state.collapsed,

    })
  }.bind(this);

  this.getActionLabel = function(ide, c9_workspace) {
    var label;
    switch(ide) {
      case "compiler":
        label = "Import into Compiler";
        break;
      case "cli":
        label = "Import with CLI";
        break;
      case "cloud9":
        label = "Import into mbed Studio (" + c9_workspace + ")";
        break;
      default:
        break;
    }
    return label;
  };

  this.getActionTarget = function(ide, c9_workspace) {
    var target;
    switch(ide) {
      case "compiler":
        target = opts.compiler_import_url;
        break;
      case "cli":
        target = "#";
        break;
      case "cloud9":
        target = this.getC9Target(c9_workspace);
        break;
      default:
        break;
    }
    return target;
  };

  this.handleAccessToken = function(data) {
    var ide = data.profile.default_editor;

    this.setState({
      access_token: data.profile.cloud9_token,
      signed_id: data.profile.signed_id,

      action: {
        type: ide,
        c9_workspace: data.profile.default_c9_workspace,
        c9_is_public: data.profile.c9_workspace_is_public
      }
    })
  }.bind(this)

  // Update state with response from async request to c9
  this.handleNewWorkspaces = function(data) {
    data = data.map(function(e) {
      return {
        owner: e.owner.name,
        name: e.name,
        private: e.visibility === "private",
        last_access: e.last_access
      }
    }).sort(function(a,b) {
      return (a.last_access < b.last_access) ? 1 : ((b.last_access < a.last_access) ? -1 : 0);
    });

    this.setState({
      workspaces: data,
      c9status: ImportButton.c9status.VALID
    });
  }.bind(this);

  this.handleIDEChange = function(e, action) {
    this.setState({
      action: action,
      userChangedIDE: true
    })
  }.bind(this);

  this.newIDEElement = function(text, action, immediateAction, classes, callback, newWindow) {
    // Default to open in new window/tab
    newWindow = typeof newWindow === 'undefined' ? true : newWindow;

    var li = $("<li></li>").addClass("ide-element")

    // Bind default click callback changing the user IDE preference
    if (immediateAction === null || ! $.isEmptyObject(action)) {
      li.bind("click", function(e) { e.preventDefault(); this.handleIDEChange(e, action) }.bind(this));
    }

    li.append( $("<a></a>")
        .attr({
          href: immediateAction ? immediateAction : "#",
          target: newWindow ? "_blank" : "_self"
        })
        .addClass(["ide-link", classes].join(" "))
        .text(text.trunc(25,25)));

    // Custom callback, if we want to do something special on click
    if (callback) {
      li.bind('click', callback);
    }

    return li;
  }

  this.getClassicBlock = function() {
    return this.newIDEElement("Import into Compiler", {
      type: "compiler"
    }, null, "lock")
  }

  this.renderCLIDropdown = function() {
    $('#dropdown-content').toggle();
    var cliInput = opts.is_library ? 'mbed add' : 'mbed import';
    cliInput = cliInput + " " + opts.clone_url;
    $('#dropdown-content').html(
        $('<div></div>)')
          .addClass('mbed-cli-wrapper')
          .html(
            [
              $('<h5></h5>').text('Importing project with mbed CLI'),
              $('<p></p>').text('This is how you do it:'),
              $('<input></input>')
                .attr({ id: 'mbed-cli-input', value: cliInput }),
              $('<button></button>')
                .addClass('clippy-btn')
                .attr({
                  'data-clipboard-target': '#mbed-cli-input'
                }),
              $('<a></a>')
                .attr({
                  href: 'https://docs.mbed.com/docs/mbed-os-handbook/en/5.1/dev_tools/cli/',
                  target: '_blank'
                })
                .text('Instructions for installing mbed CLI')
            ]
          )
    );
  },

  this.getLoginURL = function() {
    // state contains both signed ID and URL back to this component,
    // so that on successfull login the callback redirect here again.
    var callback_state = this.state.signed_id + ":" + Base64.encode(window.location.pathname);
    return "https://studio.mbed.com/auth/mbed?" + $.param({
      r: "https://studio.mbed.com/api/nc/auth?" + $.param({
            state: callback_state,
            response_type: 'token',
            client_id: 'mbed'
      })
    })
  }.bind(this),

  this.cliCallback = function(e) {
    e.preventDefault();
    this.renderCLIDropdown();
    return false;
  }.bind(this);

  this.getCliBlock = function() {
    return this.newIDEElement("Import with mbed CLI", {
      type: "cli"
    })
  };

  this.increaseShownWorkspaces = function(e) {
    e.preventDefault();
    this.setState({ c9idx: this.state.c9idx + 5 });
  }.bind(this);

  this.getC9Block = function() {
    if (this.state.c9status === ImportButton.c9status.UNKNOWN) {
      return "";
    }
    if (this.state.c9status === ImportButton.c9status.INVALID) {
      return this.newIDEElement("Login/signup to mbed Studio", {}, this.getLoginURL(), null, null, false);
    }

    if (this.state.workspaces.length == 0) {
      return this.newIDEElement("Create a new mbed Studio workspace", {}, "https://studio.mbed.com");
    }

    var elements = $();
    for (idx in this.state.workspaces.slice(0, this.state.c9idx)) {
      var workspace = this.state.workspaces[idx];
      elements = elements.add(this.newIDEElement("Import into mbed Studio (" + workspace.name + ")", {
        type: "cloud9",
        c9_workspace: workspace.owner + "/" + workspace.name,
        c9_is_public: !workspace.private
      }, null, (workspace.private ? "lock" : "")));
    }

    if (this.state.workspaces.length > this.state.c9idx) {
      elements = elements.add(this.newIDEElement("More workspaces...", {}, "#", "more-workspaces", this.increaseShownWorkspaces));
    }

    return elements;
  }

  this.renderDropdown = function() {
    var ul = $("<ul></ul>").addClass('import-dropdown');

    var blocks = $();
    blocks = blocks.add(this.getClassicBlock());
    if (opts.cli_enabled) {
      blocks = blocks.add(this.getCliBlock());
    }
    if (opts.c9_enabled) {
      blocks = blocks.add(this.getC9Block());
    }

    ul.append(blocks)
    $("#dropdown-content").html(ul);
  }

  this.getC9Target = function(workspace_name) {
    var params = $.param({
      name: workspace_name,
      workspaceType: 'mbed',
      repo: opts.clone_url,
      program_type: opts.is_library ? "library" : "program"
    })
    return "/ide/open?" + params;
  }

  this.getActionButton = function() {
    var label = this.getActionLabel(this.state.action.type, this.state.action.c9_workspace);
    var target = this.getActionTarget(this.state.action.type, this.state.action.c9_workspace);
    var is_private = this.state.action.type === "cloud9" ? ! this.state.action.c9_is_public : false;
    // Check if type is 'cli', in which case we add callback
    var callback = this.state.action.type === "cli" ? this.cliCallback : null;

    // Add lock symbol if private c9 workspace
    var private_class = is_private ? "lock" : "";

    var b = $('<a></a>')
      .addClass(['import-button-a', private_class].join(" "))
      .attr({
        'id': 'import-button-action',
        'href': target,
        'target': '_blank'
      })
      .text(label.trunc(12,10));
    if (callback) {
      b.bind('click', callback);
    }
    return b;

  }.bind(this)

  this.newDropdown = function() {
    return $('<div></div>')
      .attr({
        'id': 'dropdown-content',
      })
  }

  this.render = function() {
    // Dropdown content (initially hidden, and empty)
    var dropdown = this.newDropdown().hide();

    // Create the button toggle
    var buttonToggle = $('<div></div>')
      .addClass('import-button-toggle')
      .bind('click', this.handleToggleClick)

    // The action button
    var buttonAction = this.getActionButton();

    // Append to root element, effectivly rendering the button
    $(root)
      .html([buttonAction, buttonToggle, dropdown]);

  }.bind(this);

  // Initialize the component
  this.initialize();

  // Do the initial render
  this.render();
};

ImportButton.c9status = {
  UNKNOWN: 0,
  VALID: 1,
  INVALID: 2
};

String.prototype.trunc = String.prototype.trunc ||
  function(minStart, minEnd){
    if (this.length <= minStart + minEnd) {
      return this;
    }

    return this.substr(0, minStart) + '...' + this.substr(this.length-minEnd, this.length);
  };

/* http://stackoverflow.com/a/246813/503866 */
var Base64 = {
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode : function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = Base64._utf8_encode(input);
      while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }
          output = output +
          this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
          this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      }
      return output;
  },
  _utf8_encode : function (string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) {
              utftext += String.fromCharCode(c);
          }
          else if((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128);
          }
          else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128);
          }

      }
      return utftext;
  }
}
