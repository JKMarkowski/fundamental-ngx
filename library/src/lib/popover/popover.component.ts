import {
    Component,
    Input,
    HostListener,
    ElementRef,
    Inject,
    OnInit,
    Output,
    EventEmitter,
    ViewChild,
    AfterViewInit,
    ChangeDetectorRef,
    AfterViewChecked, OnChanges, SimpleChanges
} from '@angular/core';
import { HashService } from '../utils/hash.service';

import Popper from 'popper.js';

@Component({
    selector: 'fd-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges {
    @Input()
    placement: Popper.Placement = 'bottom-start';
    @Input()
    positionFixed: boolean = false;
    @Input()
    eventsEnabled: boolean = true;
    @Input()
    modifiers: Popper.Modifiers = {};

    @Input() // TODO: deprecated, leaving for backwards compatibility
    alignment: string = '';
    @Input()
    arrow: boolean = true;
    @Input()
    disabled: boolean = false;
    @Input()
    isDropdown: boolean = false;
    @Input()
    isTimePicker: boolean = false;
    @Input()
    isSearchInput: boolean = false;
    @Input()
    glyph: string;
    @Input() // TODO: deprecated, leaving for backwards compatibility
    size: string;
    @Input()
    btnType: string = '';
    @Input()
    isOpen: boolean = false;
    @Input()
    compact: boolean = false;
    @Input()
    standard: boolean = false;
    @Input()
    toolbar: boolean = false;

    popoverBodyHasContent: boolean = false;

    private popper: Popper;

    @Output()
    popoverClosed: EventEmitter<any> = new EventEmitter<any>();

    popoverControlIsTabIndexed: boolean = false;

    @ViewChild('popoverControlWrapper')
    popoverControl: ElementRef;

    @ViewChild('popoverDropdownControlWrapper')
    popoverDropdownControl: ElementRef;

    @ViewChild('popoverBodyContent')
    popoverBodyContent;

    id: string;

    close() {
        if (this.isOpen) {
            this.isOpen = false;
            if (this.popper) {
                this.popper.destroy();
            }
            this.popper = null;
            this.popoverClosed.emit();
        }
    }

    open() {
        if (!this.isOpen) {
            const popoverOptions = {
                placement: this.placement,
                positionFixed: this.positionFixed,
                eventsEnabled: this.eventsEnabled,
                modifiers: this.modifiers
            };
            if (this.arrow && !this.isDropdown) {
                popoverOptions.modifiers.arrow = {
                    element: this.popoverBodyContent.nativeElement.querySelector('.fd-popover__arrow')
                }
            }
            this.popper = new Popper(
                this.getPopoverControl(),
                this.getPopoverContent(),
                popoverOptions
            );
            this.isOpen = true;
        }
    }

    getPopoverContent() {
        let retVal;
        if (this.popoverBodyContent) {
            retVal = this.popoverBodyContent.nativeElement;
        }
        return retVal;
    }

    getPopoverControl() {
        let retVal;
        if (this.popoverControl) {
            retVal = this.popoverControl.nativeElement;
        } else if (this.popoverDropdownControl) {
            retVal = this.popoverDropdownControl.nativeElement;
        }
        return retVal;
    }

    @HostListener('document:keydown.escape', [])
    onEscapeKeydownHandler() {
        this.close();
    }

    onKeypressHandler(event) {
        if (this.isSearchInput) {
            this.open();
        } else if (!this.popoverControlIsTabIndexed && (event.code === 'Space' || event.code === 'Enter')) {
            event.preventDefault();
            if (!this.isTimePicker) {
                if (this.isOpen) {
                    this.close();
                } else {
                    this.open();
                }
            }
        }
    }

    @HostListener('document:click', ['$event'])
    onClickHandler(e: MouseEvent) {
        const target = e.target;
        if (this.eRef.nativeElement.contains(target)) {
            if (!this.isTimePicker && !this.isSearchInput) {
                if (this.isOpen) {
                    this.close();
                } else {
                    this.open();
                }
            } else if (this.isSearchInput) {
                const targetElement = <HTMLElement>target;
                if (this.isOpen && targetElement.tagName === 'BUTTON') {
                    this.close();
                } else {
                    this.open();
                }
            }
        } else {
            this.close();
        }
    }

    constructor(
        @Inject(HashService) private hasher: HashService,
        private eRef: ElementRef,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.id = this.hasher.hash();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.placement && !changes.placement.firstChange ||
            changes.positionFixed && !changes.positionFixed.firstChange ||
            changes.eventsEnabled && !changes.eventsEnabled.firstChange) {
            this.close();
            this.open();
        }
    }

    ngAfterViewInit() {
        /*
         check if the popover control contents have a tab index, and if not, add tabindex, role="button", and keypress handler (see HTML)
         */
        if (
            (this.popoverControl &&
                this.popoverControl.nativeElement &&
                this.popoverControl.nativeElement.children &&
                this.popoverControl.nativeElement.children[0] &&
                this.popoverControl.nativeElement.children[0].children &&
                this.popoverControl.nativeElement.children[0].children[0] &&
                this.popoverControl.nativeElement.children[0].children[0].tabIndex >= 0) ||
            this.isTimePicker
        ) {
            this.popoverControlIsTabIndexed = true;
        }
        this.cd.detectChanges();
    }

    ngAfterViewChecked() {
        if (this.popoverBodyContent && this.popoverBodyContent.nativeElement.children.length) {
            this.popoverBodyHasContent = true;
        }
        this.cd.detectChanges();
    }
}
