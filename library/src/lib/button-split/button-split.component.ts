import { Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
import { PopoverComponent } from '../popover/popover.component';

/**
 * Button directive, used to enhance standard HTML buttons.
 *
 * ```html
 * <button fd-button>Button Text</button>
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: 'fd-button-split',
    templateUrl: 'button-split.component.html'
})
export class ButtonSplitComponent extends AbstractFdNgxClass {

    @ContentChild(PopoverComponent) popover: PopoverComponent;

    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['click'];

    /** Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick: boolean = true;

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey: boolean = true;

    /** Whether the popover should be focusTrapped. */
    @Input()
    focusTrapped: boolean = false;

    /** Whether to apply compact mode to the button. */
    @Input() compact: boolean;

    /** The icon to include in the button. See the icon page for the list of icons. */
    @Input() glyph: string = 'slim-arrow-down';

    /** The icon to include in the button. See the icon page for the list of icons. */
    @Input() disabled: boolean;

    /** The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'*/
    @Input() fdType: string;

    /** @hidden */
    @Input() semantic: string; // TODO: deprecated, leaving for backwards compatibility

    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.' */
    @Input() options: string | string[];

    /** @hidden */
    @Input() size: string; // TODO: deprecated, leaving for backwards compatibility

    /** @hidden */
    @Input() isOpen: boolean = false;

    @Output() isOpenChange = new EventEmitter<boolean>();
    @Output() primaryButtonClicked = new EventEmitter<boolean>();

    /** @hidden */
    _setProperties() {}

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

    public buttonClick($event) {
        this.primaryButtonClicked.emit();
        $event.stopPropagation();
    }

    /**
     * Toggles the popover open state.
     */
    public toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Closes the popover.
     */
    public close(): void {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    }

    /**
     * Opens the popover.
     */
    public open(): void {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }

}
