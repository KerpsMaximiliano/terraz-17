import { Component, ChangeDetectionStrategy, ViewChild, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

// * Services.
import { CoreService } from '@app/core/services/core.service';

// * Material.
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MatSidenavModule],
  selector: 'app-windows',
  template: `
    <style></style>
    <mat-drawer-container hasBackdrop="true">
      <mat-drawer #drawer mode="over" position="end" [autoFocus]="false">
        @defer {}
      </mat-drawer>
      <mat-drawer-content>
        <router-outlet />
      </mat-drawer-content>
    </mat-drawer-container>
  `,
})
export class WindowsComponent implements OnDestroy {
  @ViewChild('drawer') public drawer?: MatDrawer;

  private _service = inject(CoreService);
  private _subscription: Subscription = this._service.menu.subscribe(() => this.drawer?.toggle());

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
