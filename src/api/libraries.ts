import instance from "./index";
import data from "../data/data-20161110T1744.json";

export interface ILibrary {
  order: number;
  fullname: string;
  kopuk: string;
  territory: string;
  address: string;
  formname: string;
  period: string;
  libraries: number;
  buildings_repair: number;
  buildings_disrepair: number;
  buildings_management: number;
  libraries_computers: number;
  internet: number;
  site: number;
  "number_of_personal_computers_in_libraries,_units": number;
  computers: number;
  digital_catalogs: number;
  internet_catalogs: number;
  electronic_catalogue_volume: number;
  internet_catalogue_volume: number;
  users: number;
  users_children: number;
  visits: number;
  received_copies: number;
  received_electronic: number;
  out_of_instances: number;
  dropped_copies: number;
  copies: number;
  copies_electronic: number;
  copies_issued: number;
  issued_electronic: number;
  copies_issued_children: number;
  subscribers: number;
  "individual_subscribers_(information_services),_units": number;
  visits_sites: number;
  employees: number;
  employees_staff: number;
  staff_higheeducated: number;
  "staff_vocational,_people": number;
  funds: number;
  funds_budget: number;
  funds_entrepreneurial: number;
  "funds_main_activity,_thousand_rubles": number;
  funds_used: number;
  "funds_staff,_thousand_rubles": number;
  funds_acquisition: number;
}

interface ILibrariesAPI {
  getAllLibraries: () => Promise<Array<ILibrary>>;
  getLibrary: (id: number) => Promise<ILibrary>;
}

export const LibrariesAPI: ILibrariesAPI = {
  /**
    not working because of CORS
  */
  // async getAllLibraries() {
  //   return await instance
  //     .get("/7705851331-stat_library/data-2016-11-10T00-00-00-structure-2016-09-12T00-00-00.json")
  //     .then((res) => res.data);
  // },
  async getAllLibraries() {
    return data;
  },
  async getLibrary(id) {
    return data.filter((library) => {
      console.log(library, id)
      return library.order === id
    })[0];
  },
};
