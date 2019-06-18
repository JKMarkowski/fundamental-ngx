import {
    AfterContentInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    Output,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';

@Component({
    // TODO to be discussed
    selector: 'fd-tab-item',
    templateUrl: './tab-item.component.html',
    host: {
        class: 'fd-tabs__item'
    }
})
export class TabItemComponent implements AfterContentInit {

    @ContentChild(TabLinkDirective) tabLink: TabLinkDirective;
    @ViewChild('tabContent', { read: ViewContainerRef }) content: ViewContainerRef;

    /** Whether the tab is disabled. */
    @Input()
    disabled: boolean;

    /** Whether the tab is disabled. */
    @Input()
    expanded: boolean;

    ngAfterContentInit(): void {
        this.tabLink.activateChange(this.expanded);
        this.tabLink.ngOnChanges();
    }

    public activateChange(isActive: boolean) {
        this.tabLink.activateChange(isActive)
    }

    @Output() clicked = new EventEmitter();
}
