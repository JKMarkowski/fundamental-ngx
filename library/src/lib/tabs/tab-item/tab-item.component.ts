import {
    AfterContentInit,
    ContentChild, Directive, ElementRef,
    EventEmitter,
    Output, TemplateRef
} from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
import { TabContentDirective } from '../tab-utils/tab-directives';

@Directive({
    // TODO to be discussed
    selector: '[fd-tab-item]',
    host: {
        class: 'fd-tabs__item'
    }
})
export class TabItemComponent extends AbstractFdNgxClass implements AfterContentInit {

    @ContentChild(TabLinkDirective) tabLink: TabLinkDirective;

    @ContentChild(TabContentDirective, {read: TemplateRef}) tabContent: TemplateRef<TabContentDirective>;

    /** Whether the tab is disabled. */
    disabled: boolean;

    /** Whether the tab is disabled. */
    expanded: boolean;

    @Output() clicked = new EventEmitter();

    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

    ngAfterContentInit(): void {
        this.tabLink.activateChange(this.expanded);
        this.tabLink.ngOnChanges();
    }

    public activateChange(isActive: boolean) {
        this.expanded = isActive;
        this.tabLink.activateChange(isActive)
    }

    _setProperties(): void {
        if (this.tabLink) {
            this.activateChange(this.expanded);
        }
    }
}
