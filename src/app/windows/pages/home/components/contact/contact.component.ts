import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// * Directives.
import { NgIf, NgStyle } from '@angular/common';

// * Interfaces.
import { INetwork } from '@windows-home/interfaces/contact.interface';
import { Icon } from '@windows-home/interfaces/icon.interface';

// * Forms.
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Validators.
import { getErrorMessage, isLettersOnly, isNumbersOnly, notOnlySpaces } from '@core/validators/form.validator';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

// * Components.
import { MapComponent } from '@app/core/components/map.component';
import { ButtonComponent } from '@core/components/button.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgStyle,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MapComponent,
    ButtonComponent,
  ],
  selector: 'app-windows-home-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', '../common.scss'],
})
export class ContactComponent {
  public form: UntypedFormGroup;
  public getErrorMessage = getErrorMessage;
  public networks: INetwork[] = [
    {
      svg: 'facebook',
      link: 'https://www.facebook.com/TerrazSoluciones/?locale=ca_ES',
    },
    {
      svg: 'instagram',
      link: 'https://www.instagram.com/terraz.desarrollos/?hl=es-la',
    },
    {
      svg: 'whatsapp',
      link: 'https://wa.me/+5493413816505',
    },
  ];

  private readonly _ICONS: Icon[] = [
    {
      name: 'facebook',
      src: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M30 60c16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0 13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30Z" fill="#c4c4c4" class="fill-000000"></path><path d="M25.462 47.314V30h-3.519v-5.74h3.52v-3.47c0-4.682 1.399-8.058 6.525-8.058h6.098v5.727h-4.294c-2.15 0-2.64 1.43-2.64 2.926v2.875h6.617L36.866 30h-5.714v17.315h-5.69Z" fill="#FFFFFF" class="fill-ffffff"></path></g></svg>`,
    },
    {
      name: 'instagram',
      src: `<svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.163 0 0 7.163 0 16c0 8.836 7.163 16 16 16s16-7.164 16-16c0-8.837-7.163-16-16-16z" fill="#c4c4c4" class="fill-333333"></path><path d="M22.057 7.93H9.943c-1.14 0-2.019.879-2.019 2.019v12.113c0 1.14.879 2.019 2.019 2.019h12.113c1.14 0 2.019-.879 2.019-2.019V9.949a1.986 1.986 0 0 0-2.018-2.019zm-6.045 4.903c1.791 0 3.243 1.407 3.243 3.142 0 1.735-1.452 3.142-3.243 3.142-1.79 0-3.242-1.408-3.242-3.142 0-1.736 1.452-3.142 3.242-3.142zm6.045 8.724c0 .354-.151.505-.505.505H10.448c-.353 0-.505-.151-.505-.505v-7.066l1.258.274a4.7 4.7 0 0 0-.208 1.385c0 2.684 2.248 4.863 5.018 4.863 2.772 0 5.019-2.178 5.019-4.863a4.7 4.7 0 0 0-.208-1.385l1.234-.274v7.066zm0-9.085a.505.505 0 0 1-.505.505h-2.019a.505.505 0 0 1-.505-.505v-2.019c0-.279.226-.505.505-.505h2.019c.279 0 .505.226.505.505v2.019z" fill="#FFFFFF" class="fill-ffffff"></path></svg>`,
    },
    {
      name: 'whatsapp',
      src: `<svg viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"><path d="M256 0c141.29 0 256 114.71 256 256 0 141.29-114.71 256-256 256C114.71 512 0 397.29 0 256 0 114.71 114.71 0 256 0Zm121.527 134.844c-30.646-30.672-71.401-47.571-114.822-47.588-89.468 0-162.284 72.788-162.319 162.256-.012 28.599 7.462 56.516 21.666 81.122L99.024 414.72l86.048-22.564c23.708 12.927 50.401 19.739 77.568 19.751h.067c89.459 0 162.281-72.797 162.317-162.266.017-43.358-16.851-84.127-47.497-114.797ZM262.706 384.501h-.054c-24.209-.01-47.953-6.511-68.667-18.799l-4.927-2.924-51.061 13.391 13.629-49.769-3.208-5.102c-13.505-21.473-20.637-46.293-20.627-71.776.03-74.362 60.552-134.861 134.969-134.861 36.035.014 69.908 14.062 95.38 39.554 25.472 25.493 39.492 59.379 39.478 95.416-.03 74.367-60.551 134.869-134.912 134.87Zm74.003-101.01c-4.056-2.029-23.996-11.838-27.715-13.191-3.717-1.353-6.42-2.03-9.124 2.029-2.704 4.059-10.477 13.192-12.843 15.898-2.365 2.705-4.731 3.045-8.787 1.014-4.056-2.028-17.124-6.31-32.615-20.124-12.057-10.75-20.197-24.029-22.563-28.087-2.365-4.059-.252-6.253 1.779-8.275 1.824-1.816 4.055-4.735 6.083-7.103 2.028-2.368 2.704-4.059 4.056-6.764 1.352-2.707.676-5.074-.338-7.104-1.014-2.029-9.125-21.986-12.505-30.104-3.291-7.906-6.635-6.836-9.125-6.96-2.363-.118-5.069-.143-7.773-.143-2.704 0-7.097 1.015-10.816 5.074-3.717 4.059-14.194 13.868-14.194 33.824 0 19.957 14.533 39.236 16.561 41.943 2.028 2.706 28.599 43.659 69.284 61.221 9.676 4.177 17.231 6.672 23.121 8.541 9.716 3.085 18.557 2.65 25.546 1.606 7.792-1.164 23.996-9.809 27.375-19.279 3.379-9.471 3.379-17.589 2.366-19.28-1.014-1.691-3.718-2.706-7.773-4.736Z" fill="#c4c4c4" class="fill-000000"></path></svg>`,
    },
  ];

  constructor(
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer
  ) {
    this._ICONS.forEach((icon: Icon) => {
      this._iconRegistry.addSvgIconLiteral(icon.name, this._sanitizer.bypassSecurityTrustHtml(icon.src));
    });
    this.form = this._setForm();
  }

  public color(field: string, focused: boolean): string {
    if (this.form.get(field)?.valid && this.form.get(field)?.touched && !focused) {
      return 'var(--form-init)';
    } else if (
      (focused && !this.form.get(field)?.invalid) ||
      (focused && !this.form.get(field)?.touched) ||
      !this.form.get(field)?.invalid
    ) {
      return 'var(--form-success)';
    } else if (this.form.get(field)?.invalid && this.form.get(field)?.touched) {
      return 'var(--form-error)';
    } else {
      return 'var(--form-init)';
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  private _setForm(): UntypedFormGroup {
    return new UntypedFormGroup({
      name: new UntypedFormControl(
        null,
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), isLettersOnly()])
      ),
      phone: new UntypedFormControl(
        null,
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15), isNumbersOnly()])
      ),
      mail: new UntypedFormControl(
        null,
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.email])
      ),
      message: new UntypedFormControl(
        null,
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(200), notOnlySpaces()])
      ),
    });
  }
}
