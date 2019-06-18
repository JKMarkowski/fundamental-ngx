import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-link]',
    host: {
        class: 'fd-tabs__link',
        role: 'tab',
    }
})
export class TabLinkDirective extends AbstractFdNgxClass {
    /** The title of the tab header. */
    @Input()
    title: string;

    /** Aria-label of the tab. Also applied to the tab header. */
    @Input()
    ariaLabel: string;

    /** Id of the element that labels the tab. Also applied to the tab header. */
    @Input()
    ariaLabelledBy: string;

    /** Whether the tab is disabled. */
    @Input()
    disabled: boolean;

    /** Whether the tab is disabled. */
    @Input()
    active: boolean;

    @HostListener('click')
    clickLink() {
        this.clicked.emit();
    }

    @HostBinding('attr.aria-selected') selected: boolean = this.active;
    @HostBinding('attr.tabindex') tabIndex: number = this.disabled ? -1 : 0;

    @Output() clicked = new EventEmitter();

    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

    activateChange(isActive: boolean) {
        this.active = isActive;
        this.ngOnChanges();
    }

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-tabs__link');
        if (this.active) {
            this._addClassToElement('is-selected');
        }
    }
}
