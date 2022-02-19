import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { ViewComponent } from './view/view.component';
import {HmiRoutingModule} from "./hmi-routing.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {IconsProviderModule} from "./icons-provider.module";
import {NzTableModule} from "ng-zorro-antd/table";
import {ColorPickerModule} from "ngx-color-picker";



@NgModule({
  declarations: [
    EditorComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    HmiRoutingModule,
    NzLayoutModule,
    NzCollapseModule,
    NzIconModule,
    NzDividerModule,
    NzTableModule,
    IconsProviderModule,
    ColorPickerModule,
  ]
})
export class HmiModule { }
