import { Component } from '@angular/core';

import * as popoverSrc from '!raw-loader!./examples/popover-example.component.html';
import * as popoverPlacementSrc from '!raw-loader!./examples/popover-placement-example.component.html';
import * as popoverProgrammaticHtmlSrc from '!raw-loader!./examples/popover-programmatic-open-example.component.html';
import * as popoverProgrammaticTsSrc from '!raw-loader!./examples/popover-programmatic-open-example.component.ts';

@Component({
    selector: 'app-popover',
    templateUrl: './popover-docs.component.html'
})
export class PopoverDocsComponent {
    popoverExampleHtml = popoverSrc;
    popoverPlacementExampleHtml = popoverPlacementSrc;
    popoverProgrammaticExampleHtml = popoverProgrammaticHtmlSrc;
    popoverProgrammaticExampleTs = popoverProgrammaticTsSrc;

    constructor() {}
}
