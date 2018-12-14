var ProductMediaZoom = {
    imageWrapper: null,
    IMAGE_ZOOM_THRESHOLD : 20,    
        
    destroyZoom: function() {
        $j('.zoomContainer').remove();
        $j('.product-image-gallery .gallery-image').removeData('elevateZoom');
    },
    createZoom: function(image) {
         if (!image.length){
            return;   
         }
         ProductMediaZoom.destroyZoom();         
         if (window.matchMedia("only screen and (max-width: 768px)").matches){
             return;
         }
         if(image[0].naturalWidth && image[0].naturalHeight) {
            var widthDiff = image[0].naturalWidth - image.width() - ProductMediaZoom.IMAGE_ZOOM_THRESHOLD;
            var heightDiff = image[0].naturalHeight - image.height() - ProductMediaZoom.IMAGE_ZOOM_THRESHOLD;

            if(widthDiff < 0 && heightDiff < 0) {
            //image not big enough

                image.parents('.product-image').removeClass('zoom-available');
//                return;
            } else {
                image.parents('.product-image').addClass('zoom-available');
            }
        }
        var params = getZoomParameter();
        image.elevateZoom(params);        
    },
    swapImage: function(targetImage) {
        targetImage = $j(targetImage);
        targetImage.addClass('gallery-image');

        ProductMediaZoom.destroyZoom();

        var imageGallery = $j('.product-image-gallery');

        if(targetImage[0].complete) { //image already loaded -- swap immediately

            imageGallery.find('.gallery-image').removeClass('visible');

            //move target image to correct place, in case it's necessary
            imageGallery.append(targetImage);

            //reveal new image
            targetImage.addClass('visible');

            //wire zoom on new image
            ProductMediaZoom.createZoom(targetImage);

        } else { //need to wait for image to load

            //add spinner
            imageGallery.addClass('loading');

            //move target image to correct place, in case it's necessary
            imageGallery.append(targetImage);

            //wait until image is loaded
            imagesLoaded(targetImage, function() {
                //remove spinner
                imageGallery.removeClass('loading');

                //hide old image
                imageGallery.find('.gallery-image').removeClass('visible');

                //reveal new image
                targetImage.addClass('visible');

                //wire zoom on new image
                ProductMediaZoom.createZoom(targetImage);
            });

        }
    },
    runFancy: function() {
        $j('.lb-main-icon').click(function(e){
            e.preventDefault();
            $j('.cur-active').trigger('click');
        });  
    },
    swapFancy: function(targetFancy) {
        var imageGallery = $j('.product-image-gallery');
        imageGallery.find('.vt-icon').removeClass('cur-active');
        $j(targetFancy).addClass('cur-active');        
    },
    wireThumbnails: function() {
        //trigger image change event on thumbnail click
        $j('.product-image-thumbs .thumb-link').click(function(e) {
            e.preventDefault();
            var jlink = $j(this);
            var target = $j('#image-' + jlink.data('image-index'));
            var targetFancy = $j('.vt-icon.image-fancy-' + jlink.data('image-index'));

            ProductMediaZoom.swapImage(target);
            ProductMediaZoom.swapFancy(targetFancy);
        });
    },    
    initZoom: function() {
        ProductMediaZoom.createZoom($j(".gallery-image.visible"));
    },
    initFancy: function() {        
        $j(".vt-icon").fancybox({            
            maxHeight: '80%',
            helpers: {
                title : null,
                overlay : {
                    locked  : false
                }
            }
        });
    },
    init: function() {
        ProductMediaZoom.imageWrapper = $j('.product-img-box');
        $j(window).on('delayed-resize', function(e, resizeEvent) {
            ProductMediaZoom.initZoom();
        });

        ProductMediaZoom.initZoom();

        ProductMediaZoom.wireThumbnails();

        ProductMediaZoom.initFancy();
        ProductMediaZoom.runFancy();
        
        $j(document).trigger('product-media-loaded', ProductMediaZoom);
    }    
};

var MoreImageGallery = { 
    init: function() {
        $j('#more_img_gal').owlCarousel({
            items    : GI.Options.ITEMS,
            margin   : GI.Options.MARGIN,
            lazyLoad : true,
            nav  : false,
            responsive  : {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                991: {
                    items: GI.Options.ITEMS
                }
            }
        });   
    }  
};

$j(document).ready(function() {
    ProductMediaZoom.init();
    MoreImageGallery.init();
    var resizeTimer;
    $j(window).resize(function (e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            $j(window).trigger('delayed-resize', e);
        }, 250);
    });        
});

