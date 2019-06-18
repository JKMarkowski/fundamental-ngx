import {
    AfterContentInit,
    Component, ContentChild,
    OnChanges,
    OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import { TabListComponent } from './tab-list/tab-list.component';

/**
 * Represents a list of tab-panels.
 */
@Component({
    selector: 'fd-tab',
    templateUrl: './tab.component.html',
    host: {
        role: 'tab',
        class: 'fd-tabs-custom'
    },
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['tab.component.scss']
})
export class TabComponent implements AfterContentInit {

    /** @hidden */
    @ContentChild(TabListComponent) tabListComponent: TabListComponent;



    ngAfterContentInit(): void {

    }
}
