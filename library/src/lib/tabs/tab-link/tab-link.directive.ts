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

    /** Whether the tab is disabled. */
    disabled: boolean;

    /** Whether the tab is disabled. */
    active: boolean;

    @Output() clicked = new EventEmitter();
    @Output() keyPressed = new EventEmitter<any>();

    @HostListener('click')
    clickLink() {
        this.clicked.emit();
    }

    @HostListener('keydown', ['$event'])
    keyPressLink(event: any) {
        this.keyPressed.emit(event);
    }

    public focus() {
        this.elementRef && this.elementRef.nativeElement.focus();
    }

    @HostBinding('attr.aria-selected') selected: boolean = this.active;
    @HostBinding('attr.tabindex') tabIndex: number = this.disabled ? -1 : 0;
    @HostBinding('attr.aria-disabled') ariaDisabled = this.disabled;
    @HostBinding('attr.aria-controls') ariaControls;
    @HostBinding('id') id;

    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

    activateChange(isActive: boolean) {
        this.active = isActive;
        this.ngOnChanges();
    }

    disabledChange(disabled: boolean) {
        this.disabled = disabled;
        this.ngOnChanges();
    }

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-tabs__link');
        if (this.active) {
            this._addClassToElement('is-selected');
        }
        if (this.disabled) {
            this._addClassToElement('is-disabled');
        }
    }
}
