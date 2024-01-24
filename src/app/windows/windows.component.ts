import { ChangeDetectionStrategy, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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
  selector: 'app-windows',
  template: `
    <mat-drawer-container hasBackdrop="true">
      <mat-drawer #drawer mode="over" position="end" [autoFocus]="false">
        @defer {
          <style>
            .mat-drawer {
              width: calc(var(--view) * 18);
            }

            div {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              height: 100%;
              padding: calc(var(--view) * 2);
              background-color: var(--nordic);
            }

            nav {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: calc(var(--view) * 1.5);
              width: 100%;
            }

            a {
              width: 100%;
              text-decoration: none;
              color: var(--white);
              font-size: calc(var(--view) * 1.1);
              padding: calc(var(--view) * 0.5) calc(var(--view) * 1);
              border-radius: 10px;
              display: flex;
              align-items: center;
            }

            a:hover {
              background-color: rgb(255 255 255 / 0.05);
            }

            a.active {
              background-color: rgb(255 255 255 / 0.12);
            }

            .mat-icon {
              transform: scale(calc(var(--view) * 0.05));
              margin-right: calc(var(--view) * 1);
            }

            img {
              padding: calc(var(--view) * 1);
              width: 60%;
              height: auto;
              opacity: 0.4;
            }
          </style>
          <div>
            <nav>
              <a
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                [routerLink]="''"
                (click)="navigate('/')">
                <mat-icon class="material-symbols-outlined"> home </mat-icon>
                Desarrollos
              </a>
              <a routerLinkActive="active" [routerLink]="'/proyectos'" (click)="navigate('/proyectos')">
                <mat-icon class="material-symbols-outlined"> apartment </mat-icon>
                Proyectos
              </a>
              <!-- <a routerLinkActive="active" [routerLink]="'/seguinos'" (click)="navigate('/seguinos')">
                <mat-icon class="material-symbols-outlined"> mail </mat-icon>
                Seguinos
              </a> -->
            </nav>
            <img src="assets/images/loading/logo.png" alt="Terraz" />
          </div>
        }
      </mat-drawer>
      <mat-drawer-content>
        <router-outlet />
      </mat-drawer-content>
    </mat-drawer-container>
  `,
})
export class WindowsComponent implements OnDestroy {
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
