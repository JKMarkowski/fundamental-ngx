import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabListComponent } from './tab-list/tab-list.component';

import { TabContentDirective, TabLoadContentDirective } from './tab-utils/tab-directives';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabItemComponent } from './tab-item/tab-item.component';
import { TabNavDirective } from './tab-nav/tab-nav.directive';
import { TabComponent } from './tab.component';

@NgModule({
    declarations: [
        TabListComponent,
        TabPanelComponent,
        TabLoadContentDirective,
        TabLinkDirective,
        TabItemComponent,
        TabNavDirective,
        TabContentDirective,
        TabComponent
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
        TabContentDirective,
        TabComponent
    ]
})
export class TabsModule {}
