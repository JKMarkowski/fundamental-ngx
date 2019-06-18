import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TabItemComponent } from './tab-item/tab-item.component';

/**
 * Represents a list of tab-panels.
 */
@Component({
    selector: 'fd-tab-list',
    templateUrl: './tab-list.component.html',
    styleUrls: ['./tab-list.component.scss'],
    host: {
        role: 'tablist',
        class: 'fd-tabs-custom'
    },
    encapsulation: ViewEncapsulation.None
})
export class TabListComponent implements AfterContentInit, OnChanges, OnDestroy {

    /** @hidden */
    @ContentChildren(TabItemComponent) tabLinks: QueryList<TabItemComponent>;

    /** Index of the selected tab panel. */
    @Input()
    selectedIndex: number = 0;

    /** Event emitted when the selected panel changes. */
    @Output()
    selectedIndexChange = new EventEmitter<number>();

    private _tabsSubscription: Subscription;
    private _tabsClickSubscription: Subscription[];
    private _tabsKeyPressSubscription: Subscription[];

    /** @hidden */
    ngAfterContentInit(): void {
        setTimeout(() => {
            this.selectTab(this.selectedIndex);
        });

        this.refreshSubscriptions();
        this._tabsSubscription = this.tabLinks.changes.subscribe(() => {
            if (!this.isIndexInRange() || this.isTabContentEmpty()) {
                this.resetTabHook();
            }
            this.refreshSubscriptions();
        });
    }



    /** @hidden */
    ngOnDestroy(): void {
        this._tabsSubscription.unsubscribe();
        this._tabsClickSubscription.forEach(tab => tab.unsubscribe());
        this._tabsKeyPressSubscription.forEach(tab => tab.unsubscribe());
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedIndex) {
            setTimeout(() => {
                this.selectTab(changes.selectedIndex.currentValue);
            });
        }
    }

    /**
     * Function to select a new tab from an index.
     * @param tabIndex Index of the tab to select.
     */
    selectTab(tabIndex: number): void {
        if (this.isIndexInRange() && this.isTargetTabEnabled(tabIndex)) {
            this.tabLinks.forEach((tab, index) => tab.activateChange(index === tabIndex));
            this.selectedIndex = tabIndex;
            console.log(tabIndex);
            this.selectedIndexChange.emit(tabIndex);
        }
    }

    /** @hidden */
    tabHeaderClickHandler(tabIndex: number): void {
        if (this.selectedIndex !== tabIndex) {
            this.selectTab(tabIndex);
        }
    }

    /** @hidden */
    tabHeaderKeyHandler(index: number, event: any): void {
        console.log(event);
        switch (event.code) {
            case ('ArrowLeft'): {
                if (index - 1 >= 0) {
                    this.getTabLinkFromIndex(index - 1).focus();
                } else {
                    this.getTabLinkFromIndex(this.tabLinks.length - 1).focus();
                }
                break;
            }
            case ('ArrowRight'): {
                if (index + 1 < this.tabLinks.length) {
                    this.getTabLinkFromIndex(index + 1).focus();
                } else {
                    this.getTabLinkFromIndex(0).focus();
                }
                break;
            }
            case ('Space'): {
                event.preventDefault();
                if (index !== this.selectedIndex) {
                    this.selectTab(index);
                }
                break;
            }
            case ('Enter'): {
                if (index !== this.selectedIndex) {
                    this.selectTab(index);
                }
            }
        }
    }

    /** @hidden
     *  When There are some changes at amount of tabs there is a need to reset subscription
     * */
    private refreshSubscriptions() {
        this._tabsClickSubscription && this._tabsClickSubscription.forEach(tab => tab.unsubscribe());
        this._tabsKeyPressSubscription && this._tabsKeyPressSubscription.forEach(tab => tab.unsubscribe());
        this._tabsClickSubscription = this.tabLinks.map((tab, index) => tab.tabLink.clicked.subscribe(() =>
            this.tabHeaderClickHandler(index))
        );
        this._tabsKeyPressSubscription = this.tabLinks.map((tab, index) => tab.tabLink.keyPressed.subscribe((event) =>
            this.tabHeaderKeyHandler(event, index))
        );
    }

    private isIndexInRange(): boolean {
        return this.tabLinks && this.tabLinks.length > 0 && this.selectedIndex < this.tabLinks.length;
    }

    private isTargetTabEnabled(index: number): boolean {
        return !this.tabLinks.toArray()[index].disabled;
    }

    private isTabContentEmpty(): boolean {
        let result = true;
        this.tabLinks.forEach(tab => {
            if (tab.expanded) {
                result = false;
            }
        });
        return result;
    }

    private resetTabHook(): void {
        this.selectedIndex = 0;
        setTimeout(() => {
            this.selectTab(this.selectedIndex);
        });
    }

    private getTabLinkFromIndex(index: number): HTMLElement {
        return this.tabLinks.toArray()[index].nativeElement as HTMLElement;
    }
}
