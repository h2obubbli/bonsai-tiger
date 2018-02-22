o-aside-panel [![Build Status](https://circleci.com/gh/Financial-Times/o-aside-panel.png?style=shield&circle-token=8e3fbf1e3a06d57c68bf34ab807beccc38ba913d)]
=================

Content module with a heading and one or more panels.

- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

__o-aside-panel__ provides styling for:

* Heading
* Tabs (optional)
* Panel body (minimum of 1), but _not_ panel contents

If tabs are used, then [o-tabs](http://registry.origami.ft.com/components/o-tabs)'s JavaScript must also be included in the page to provide the tabs' behaviour. __o-tabs__ is not a dependency of this module.

If multiple panels are used, the module will be sized to accommodate the tallest panel, regardless of which panel is in view.
In other words, any content below will not shift up and down as the panel in view is changed.

### Markup

#### Without tabs

```html
<div data-o-component="o-aside-panel" class="o-aside-panel">
    <div class="o-aside-panel__header">
        <h3 class="o-aside-panel__heading">Heading</h3>
    </div>
    <div class="o-aside-panel__body">
        o-aside-panel body content
    </div>
</div>
```

#### With tabs

```html
<div data-o-component="o-aside-panel" class="o-aside-panel">
    <div class="o-aside-panel__header">
        <h3 class="o-aside-panel__heading">Heading</h3>
        <ul data-o-component="o-tabs" class="o-tabs o-aside-panel__tabs" role="tablist">
            <li role="tab"><a href="#oPanelContent1">Tab 1</a></li>
            <li role="tab"><a href="#oPanelContent2">Tab 2</a></li>
            <li role="tab"><a href="#oPanelContent3">Tab 3</a></li>
        </ul>
    </div>
    <div id="oPanelContent1" class="o-aside-panel__body">
        o-aside-panel body content 1
    </div>
    <div id="oPanelContent2" class="o-aside-panel__body">
        o-aside-panel body content 2
    </div>
    <div id="oPanelContent3" class="o-aside-panel__body">
        o-aside-panel body content 3
    </div>
</div>
```

Note that the `o-aside-panel__tabs--theme` must also be set on the __o-tabs__ root element.

### Sass

As with all Origami components, o-aside-panel has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-aside-panel-is-silent : false;` in your Sass before you import the o-aside-panel Sass.


## Core experience

No _tabs_ will be shown, and _panel bodies_ will all be shown one below the other.

## Primary experience

_Tabs_ will be shown (if declared in markup) and will be functional. Only the _panel body_ for the selected _tab_ will be shown.

## Troubleshooting

### No tabs are showing, all panels are being shown
That is to be expected for core experience.

## Migration guide

### Migrating from 2.X.X to 3.X.X

V2 -> V3 introduces the new majors of o-colors and o-typography. Updating to this new version will mean updating any other components that you have which are using o-colors or o-typography. There are no other breaking changes in this release.

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-aside-panel/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
