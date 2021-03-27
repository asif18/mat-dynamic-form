import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, FormArrayName } from '@angular/forms';
import { DataService } from '../../services';

interface FormControlOptions {
  bsOptions?: Array<string>;
  bsFilteredOptions?: Observable<string[]>;
}
@Component({
  selector: 'app-provider-criteria-assignment',
  templateUrl: './provider-criteria-assignment.component.html',
  styleUrls: ['./provider-criteria-assignment.component.sass']
})
export class ProviderCriteriaAssignmentComponent implements OnInit {

  public filteredOptions: Observable<string[]>;
  public blueShieldInfoForm: FormGroup;
  public formControlOptions: FormControlOptions = {
    bsOptions: ['One', 'Two', 'Three'],
    bsFilteredOptions: new Observable(),
  };

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.init();
  }

  private init(): void {
    this.createBlueshieldForm();
    this.generateBsFiteredOptions();
  }

  private generateBsFiteredOptions() {
    this.formControlOptions.bsFilteredOptions = this.blueShieldInfoForm.controls['bsNumber'].valueChanges
      .pipe(startWith(''), map(value => this.bsFiter(value)));
  }

  private bsFiter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.formControlOptions.bsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  public bsNumberChange(event: any): void {
    if (this.getBlueShieldInfoForm.bsNumber.value) {
      this.addAdditionalCriteria();
    }
  }

  private createBlueshieldForm(): void {
    this.blueShieldInfoForm = new FormGroup({
      bsNumber: new FormControl(null, [Validators.required]),
      criterias: this.formBuilder.array([]),
      secondaryClaim: this.formBuilder.array([])
    });
  }

  get getBlueShieldInfoForm() {
    return this.blueShieldInfoForm.controls;
  }

  public addAdditionalCriteria(): void {
    this.additionalCriterias.push(this.generateAdditionalCriteria());
  }

  private generateAdditionalCriteria(): FormGroup {
    return this.formBuilder.group({
      criteriaName: ['', Validators.required],
      criteriaDetails: this.formBuilder.array([])
    });

  }

  get additionalCriterias(): FormArray {
    return this.blueShieldInfoForm.get('criterias') as FormArray;
  }

}
