import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

// * Rxjs.
import { Observable } from 'rxjs';

// * Fire.
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

// * Services.
import { CoreService } from '@app/core/services/core.service';

// * Material.
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, AsyncPipe],
  selector: 'app-windows-frequent-questions',
  templateUrl: './frequent-questions.component.html',
  styleUrls: ['./frequent-questions.component.scss'],
})
export class FrequentQuestionsComponent {
  private _service: CoreService = inject(CoreService);

  public questions$?: Observable<IQuestions[]>;

  private _fire: Firestore = inject(Firestore);

  public ngOnInit(): void {
    const ref = collection(this._fire, 'questions');
    this.questions$ = collectionData(ref) as Observable<IQuestions[]>;
  }

  public contact(): void {
    this._service.toElement();
  }
}

export interface IQuestions{
  quest: string;
  answer: string;
  
}