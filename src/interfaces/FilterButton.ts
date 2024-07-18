export interface Filter{
    id: number;
    name: string;
    slug: string;
}
export default interface FilterButton {
    allCategories: Filter[];
    allTypes: Filter[];

}