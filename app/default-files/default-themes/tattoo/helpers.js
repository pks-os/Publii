/*
 * Custom theme helpers for Handlebars.js
 */

let themeHelpers = {
    lazyLoadForContentImages: function(postText) {
        let modifiedPostText = postText;
        // Select all images from the content
        modifiedPostText = modifiedPostText.replace(/<img[a-zA-Z0-9\s\"\'\=\-]*?src="(.*?)".*?>/gmi, function(match, url) {
            if (match.indexOf('data-is-external-image="true"') > -1) {
                return match;
            }

            // Create *-xs image path
            let image = url.split('.');

            if(
                url.indexOf('/gallery/') === -1 && (
                    image[image.length - 1] === 'jpeg' ||
                    image[image.length - 1] === 'jpg' ||
                    image[image.length - 1] === 'png' ||
                    image[image.length - 1] === 'JPEG' ||
                    image[image.length - 1] === 'JPG' ||
                    image[image.length - 1] === 'PNG'
                )
            ) {
                let xsImage = image.slice(0, image.length - 1).join('.') + '-xs.' + image[image.length - 1];
                xsImage = xsImage.split('/');
                xsImage[xsImage.length - 2] = xsImage[xsImage.length - 2] + '/responsive';
                xsImage = xsImage.join('/');
                // Replace src attribute with *-xs image path
                match = match.replace(/src=".*?"/gi, 'src="' + xsImage + '"');
                // change srcset to data-srcset
                match = match.replace('srcset="', 'data-srcset="');
                // replace sizes with data-sizes
                match = match.replace(/sizes=".*?"/i, 'data-sizes="auto"');
                // add necessary CSS classes
                if(match.indexOf('class="') > -1) {
                    match = match.replace('class="', 'class="lazyload blur-up ');
                } else {
                    match = match.replace('<img', '<img class="lazyload blur-up"');
                }
            }
            // return modified <img> tag
            return match;
        });

        return modifiedPostText;
    }
};

module.exports = themeHelpers;
