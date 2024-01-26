import { ChangeDetectionStrategy, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// * Rxjs.
import { Subscription } from 'rxjs';

// * Services.
import { CoreService } from '@app/core/services/core.service';

// * Material.
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MatSidenavModule, MatIconModule, RouterLink, RouterLinkActive],
  selector: 'app-mobile',
  template: `
    <mat-drawer-container hasBackdrop="true">
      <mat-drawer #drawer mode="over" position="end" [autoFocus]="false">
        @defer {
          <style>
            .mat-drawer {
              width: max-content;
            }

            div {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              height: 100%;
              padding: 12px;
              background-color: var(--nordic);
            }

            nav {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 8px;
              width: 100%;
            }

            a {
              width: 100%;
              text-decoration: none;
              color: var(--white);
              font-size: 16px;
              padding: 16px;
              border-radius: 10px;
              display: flex;
              align-items: center;
            }

            a.active {
              background-color: rgb(255 255 255 / 0.12);
            }

            .mat-icon {
              transform: scale(calc(var(--view) * 0.05));
              margin-right: calc(var(--view) * 1);
            }

            img {
              padding: 16px;
              width: 100%;
              height: auto;
              opacity: 0.4;
            }
          </style>
          <div>
            <nav>
              <a
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                [routerLink]="'/mobile'"
                (click)="navigate('/mobile')">
                <mat-icon class="material-symbols-outlined"> home </mat-icon>
                Desarrollos
              </a>
              <a routerLinkActive="active" [routerLink]="'/mobile/proyectos'" (click)="navigate('/mobile/proyectos')">
                <mat-icon class="material-symbols-outlined"> apartment </mat-icon>
                Proyectos
              </a>
            </nav>
            <img src="assets/images/loading/logo.png" alt="Terraz" />
          </div>
        }
      </mat-drawer>
      <mat-drawer-content style="overflow: hidden;">
        <router-outlet />
      </mat-drawer-content>
    </mat-drawer-container>
  `,
})
export class MobileComponent implements OnDestroy {
  @ViewChild('drawer') public drawer?: MatDrawer;

  private _service: CoreService = inject(CoreService);
  private _router: Router = inject(Router);
  private _subscription: Subscription = this._service.menu.subscribe(() => this.drawer?.toggle());

  public navigate(route: string): void {
    if (route !== this._router.url) this._service.toggleMenu();
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
