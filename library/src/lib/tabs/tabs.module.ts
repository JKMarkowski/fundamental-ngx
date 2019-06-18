import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabPanelComponent } from './tab/tab-panel.component';
import { TabListComponent } from './tab-list.component';

import { TabContentDirective, TabLoadTitleDirective } from './tab-utils/tab-directives';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabItemComponent } from './tab-item/tab-item.component';
import { TabNavDirective } from './tab-nav/tab-nav.directive';

@NgModule({
    declarations: [
        TabListComponent,
        TabPanelComponent,
        TabLoadTitleDirective,
        TabLinkDirective,
        TabItemComponent,
        TabNavDirective,
        TabContentDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TabListComponent,
        TabPanelComponent,
        TabLinkDirective,
        TabItemComponent,
        TabNavDirective,
        TabContentDirective
    ]
})
export class TabsModule {}
