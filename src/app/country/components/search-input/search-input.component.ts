import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  placeholder = input<string>('Buscar');
  debounceTime = input<number>(1000);
  initialValue = input<string>();

  value = output<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanUp) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());
    onCleanUp(() => {
      clearTimeout(timeout);
    });
  });
}
