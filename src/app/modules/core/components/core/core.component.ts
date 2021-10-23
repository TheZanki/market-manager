import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../../services/api.service';
import { controlBuilder, marketFormatData, marketList } from '../../services/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  public constructor(
    private readonly _apiService: ApiService,
    private readonly _formBuilder: FormBuilder,
		private readonly _notification: NzMessageService
  ) { }

  public itemForm: FormGroup = new FormGroup({});
  public searchSelect = 5;
  public marketList = marketList;
	
  public marketFormControls = [
    {name: 'itemName', value: '', title: 'Name', type: 'text'},
    {name: 'description', value: '', title: 'Description', type: 'text'},
    {name: 'bundle', value: 0, title: 'Bundle', type: 'number'},
    {name: 'capacity', value: 0, title: 'Capacity', type: 'number'},
    {name: 'silpoItemId', value: '', title: 'SilpoID', type: 'text'},
    {name: 'silpoItemName', value: '', title: 'SilpoName', type: 'text'},
    {name: 'novusItemId', value: '', title: 'NovusID', type: 'text'},
    {name: 'novusItemName', value: '', title: 'NovusName', type: 'text'},
    {name: 'atbItemId', value: '', title: 'AtbID', type: 'text'},
    {name: 'atbItemName', value: '', title: 'AtbName', type: 'text'},
    {name: 'metroItemId', value: '', title: 'MetroID', type: 'text'},
    {name: 'metroItemName', value: '', title: 'MetroName', type: 'text'},

  ]


  public ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.itemForm = this._formBuilder.group(controlBuilder(this.marketFormControls));
  }

  public submitForm() {
		const body = marketFormatData(this.itemForm.value);

		this._apiService.save(body).subscribe(
			data => {
				this._notification.create('success', `The new product was created successfully`);
				this.itemForm.reset();
			}, error => {
				this._notification.create('error', `New console error`);
				console.error(error);
			});
  }

	public onItemSelected(m: any, im: number) {
		const {id, itemName} = m.selectedItem,
			marketName = this.marketList[im].name.toLowerCase();

		(this.itemForm.get(marketName + 'ItemName') as FormControl).setValue(itemName);
		(this.itemForm.get(marketName + 'ItemId') as FormControl).setValue(id);
	}

  public onSearchEnter(search: string): void {
    const marketId = this.searchSelect;

    this._apiService.search({search, searchShop: marketId, orderByPrice: true})
      .subscribe(data => {
				Object.keys(data).forEach((e) => {
					this.marketList.find((el, i) => el.result === e && data[e].length > 0 && (el.list = data[e]));
				});
      })
  }
}

