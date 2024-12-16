import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import sample from "./data.json";


export interface Location {
  locationID: number;
  name: string;
  comment?: string;
  env?: string;
}

export interface Env {
  envID: number;
  name: string;
}

export interface Server {
  serverID: number;
  name: string;
  locationID: number;
  envID: number;
}

export class Store {
  isLoaded = false;
  isLoading = false;
  locations: Location[] = [];
  envs: Env[] = [];
  servers: Server[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchData = async () => {
    this.isLoading = true;

    await sleep(3000);
    runInAction(() => {
      this.locations = sample.locations;
      this.envs = sample.envs;
      this.servers = sample.servers;
      this.isLoaded = true;
      this.isLoading = false;
    });
  };

  addLocation = (location: Location) => {
    runInAction(() => {
      this.locations.push(location);
    });
  };

  
  removeLocation = (locationID: number) => {
    runInAction(() => {
      this.locations = this.locations.filter(location => location.locationID !== locationID);
    });
  };

  
  addData = (newData: { location: string; environment: string; servers: string[]; comment: string }) => {
    
    console.log("Adding data:", newData);
    
  };
}


function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const store = new Store();
export const storeContext = createContext(store);