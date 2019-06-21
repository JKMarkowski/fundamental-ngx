import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonSplitComponent } from './button-split.component';
import { ButtonModule } from '../button';
import { PopoverModule } from '../popover';
import { ButtonSplitMenuComponent } from './button-split-menu/button-split-menu.component';

@NgModule({
    imports: [CommonModule, ButtonModule, PopoverModule],
    exports: [ButtonSplitComponent, ButtonSplitMenuComponent],
    declarations: [ButtonSplitComponent, ButtonSplitMenuComponent]
})
export class ButtonSplitModule {}
