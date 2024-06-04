
export interface Pagination{

    currentPage:number;
    itemsPerPage:number;
    totalItems:number;
    totalPages:number

}

//T => Members , Photos, ...etc
export class PaginatedResult<T>{

    result:T;
    pagination:Pagination
}