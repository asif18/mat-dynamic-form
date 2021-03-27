import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, FormArrayName } from '@angular/forms';
import { DataService } from '../../services';

interface FormDependencyData {
  bsOptions?: Array<string>;
  bsFilteredOptions?: Observable<string[]>;
  providerAssignmentActions?: Array<any>;
}
@Component({
  selector: 'app-provider-criteria-assignment',
  templateUrl: './provider-criteria-assignment.component.html',
  styleUrls: ['./provider-criteria-assignment.component.sass']
})
export class ProviderCriteriaAssignmentComponent implements OnInit {

  public filteredOptions: Observable<string[]>;
  public blueShieldInfoForm: FormGroup;
  public formDependencyData: FormDependencyData = {
    bsOptions: ['One', 'Two', 'Three'],
    bsFilteredOptions: new Observable(),
    providerAssignmentActions: [
      { label: 'BAU', value: 'BAU', checked: false, disabled: false },
      { label: 'Reject', value: 'Reject', checked: false, disabled: false },
      { label: 'Pay', value: 'Pay', checked: false, disabled: false }
    ]
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
    this.formDependencyData.bsFilteredOptions = this.blueShieldInfoForm.controls['bsNumber'].valueChanges
      .pipe(startWith(''), map(value => this.bsFiter(value)));
  }

  private bsFiter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.formDependencyData.bsOptions.filter(option => option.toLowerCase().includes(filterValue));
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
      criteriaDetails: this.formBuilder.array([this.generateCriteriaDetails()])
    });
  }

  get additionalCriterias(): FormArray {
    return this.blueShieldInfoForm.get('criterias') as FormArray;
  }

  public removeAdditionalCriteria(i: number): void {
    this.additionalCriterias.removeAt(i);
  }

  public addAdditionalDates(criteria: FormGroup): void {
    this.additionalCriteriaDetails(criteria).push(this.generateCriteriaDetails());
  }

  public removeAdditionalDates(criteria: FormGroup, j: number): void {
    this.additionalCriteriaDetails(criteria).removeAt(j);
  }

  public addAdditionalMemberType(criteriaDetail: FormGroup): void {
    this.additionalMemberDetails(criteriaDetail).push(this.generateMemberDetails());
  }

  public generateCriteriaDetails(): FormGroup {
    return this.formBuilder.group({
      criteriaStartDate: ['', Validators.required],
      criteriaEndDate: ['', Validators.required],
      memberDetails: this.formBuilder.array([this.generateMemberDetails()])
    });
  }

  public generateMemberDetails(): FormGroup {
    return this.formBuilder.group({
      memberType: ['', Validators.required],
      assignmentAction: ['', Validators.required],
      rate: ['', Validators.required],
      overlap: ['', Validators.required],
      paymentExceptions: ['', Validators.required],
      field1: ['', Validators.required],
      field2: ['', Validators.required],
      field3: ['', Validators.required],
    });
  }

  public additionalCriteriaDetails(criteria: FormGroup): FormArray {
    return criteria.get('criteriaDetails') as FormArray;
  }

  public additionalMemberDetails(criteriaDetail: FormGroup): FormArray {
    return criteriaDetail.get('memberDetails') as FormArray;
  }

  public removeMemberType(criteriaDetail: FormGroup, k: number) {
    this.additionalMemberDetails(criteriaDetail).removeAt(k);
  }

  public getFormGroupValue(formGroup: FormGroup, formControlName: string) {
    return formGroup.controls[formControlName].value;
  }
}
