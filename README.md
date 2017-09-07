# marko-amp

Accelerated Mobile Pages taglib for MarkoJS

## Usage

This library allows you to author a Marko template using Accelerated Mobile Pages tags that will be rendering depending on `out.global.amp` flag either to themthelves or to analog HTML tags. It's a work in progress.

We will implement only tags that have minimal or none runtime functionality as this taglibs aims to allow generating either AMP or HTML version of the page from the same Marko template.

# Currently implemented tags

-   `<amp-boilerplate>` - must be inserted into `<head>` of the template
-   `<amp-img>`
