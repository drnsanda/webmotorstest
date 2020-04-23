import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit {
  makes: Array<any>;
  models: Array<any>;
  years: Array<any>;
  versions: Array<any>;
  selectedMake;
  selectedModel;
  selectedType = "carros";
  constructor() { }

  ngOnInit(): void {
    this.setUpData();
  }
  getMakes() {
    let url = "http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make";
    let init: any = {
      method: "GET"
    }
    return fetch(url, init).then((res) => res.json()).then((makes) => {
      console.log("Makes ::: ", makes);
      if (Array.isArray(makes)) {
        this.makes = makes;
        return makes;
      } else {
        this.makes = [];
      }
    }).catch((error) => console.log("Error on Makes Fetch ::: ", error));

  }
  getModels(make_id) {
    let url = `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=${make_id}`;
    let init: any = {
      mode: "cors",
      method: "GET"

    }
    return fetch(url, init).then((res) => res.json()).then((models) => {
      if (Array.isArray(models)) {
        this.models = models;
        console.log("Models ::: ", models);
        return models;
      } else {
        this.models = [];
        return [];
      }
    }).catch((error) => console.log("Error on Models Fetch ::: ", error));

  }
  getYears() {

  }
  selectSearchType(type) {
    this.selectedType = type;
  }
  getVersions(model_id) {
    let url = `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=${model_id}`;
    let init: any = {
      mode: "cors",
      method: "GET"

    }
    return fetch(url, init).then((res) => res.json()).then((versions) => {
      if (Array.isArray(versions)) {
        this.versions = versions;
        return versions;
      } else {
        this.versions = [];
        return [];
      }
    }).catch((error) => console.log("Error on Versions Fetch ::: ", error));
  }
  setUpData() {
    this.getMakes().then((makes) => this.getModels(makes[0].ID).then((models) => this.getVersions(models[0].ID)));
    /*  this.getMakes().then((makes)=>this.getModels(makes[0].ID)); */
  }
  selectMake(id) {
    this.selectedMake = id;
    this.getModels(id);
  }
  selectModel(id) {
    this.selectedMake = id;
    this.getModels(id);
  }

  onSelectMakeChange($event) {
    let make_id = $event.target.value;
    this.getModels(make_id).then((models) => this.getVersions(models[0].ID))
  }
  onSelectModelChange($event) {
    let model_id = $event.target.value;
    this.getVersions(model_id);
  }
}
