export interface SearchProps{
    query:string;
    page?:string;
    per_page?:string;
    order_by?:string;
    collections?:string;
    color?:string;

}
export interface TopicProps{
    page?:number;
    per_page?:number;
    order_by?:string;
}
export interface CollectionProps{
    page?:number;
    per_page?:number;
}