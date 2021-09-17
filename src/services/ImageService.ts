import { CollectionProps, SearchProps, TopicProps } from "../interfaces/interfaces";
export default class ImageService{
    constructor(){
        this.searchPhotos=this.searchPhotos.bind(this);
        this.getPhoto=this.getPhoto.bind(this);
        this.getCollections=this.getCollections.bind(this);
        this.getCollection=this.getCollection.bind(this);
        this.getTopics=this.getTopics.bind(this);
        this.getTopic=this.getTopic.bind(this);
        this.getCollectionPhotos=this.getCollectionPhotos.bind(this);
        this.getTopicPhotos=this.getTopicPhotos.bind(this);
    }


    _apiKey="aUrtWjcm580FuFUV0v7U66ZQuW3U3Wu9Un5kNMgNsOc";
    _baseUrl="https://api.unsplash.com/";
    searchPhotos(props:SearchProps){
        
        const page = props.page ? `&page=${props.page}`:'&page=1';
        const per_page = props.per_page ? `&per_page=${props.per_page}`:'&per_page=16';
        const order_by = props.order_by ? `&order_by=${props.order_by}`:'';
        const collections = props.collections ? `&collections=${props.collections}`:'';
        const color=props.color && props.color!=="none"?`&color=${props.color}`:'';
        return fetch(`${this._baseUrl}search/photos?query=${props.query}${page}${per_page}${order_by}${collections}${color}&client_id=${this._apiKey}`).then(res=>res.json())
    }
    getPhoto(id:string){
        return fetch(`${this._baseUrl}/photos/${id}?&client_id=${this._apiKey}`).then(res=>res.json())
    }
    getCollections(props:CollectionProps){
        const page = props.page ? `&page=${props.page}`:'page=1';
        const per_page = props.per_page ? `&per_page=${props.per_page}`:'&per_page=16';
        return fetch(`${this._baseUrl}/collections?${page}${per_page}&client_id=${this._apiKey}`).then(res=>res.json())
    }

    getTopics(props:TopicProps){
        const page = props.page ? `&page=${props.page}`:'page=1';
        const per_page = props.per_page ? `&per_page=${props.per_page}`:'&per_page=16';
        const order_by = props.order_by ? `&order_by=${props.order_by}`:'';
        return fetch(`${this._baseUrl}/topics?${page}${per_page}${order_by}&client_id=${this._apiKey}`).then(res=>res.json())
    }

    getCollectionPhotos(id:string,page:number){
        return fetch(`${this._baseUrl}/collections/${id}/photos?&per_page=16&page=${page}&client_id=${this._apiKey}`).then(res=>res.json());
    }
    getTopicPhotos(id:string,page:number){
        return fetch(`${this._baseUrl}topics/${id}/photos?&per_page=16&page=${page}&client_id=${this._apiKey}`).then(res=>res.json());
    }
    getCollection(id:string){
        return fetch(`${this._baseUrl}/collections/${id}?&client_id=${this._apiKey}`).then(res=>res.json());
    }
    getTopic(id:string){
        return fetch(`${this._baseUrl}topics/${id}?&client_id=${this._apiKey}`).then(res=>res.json());
    }
}
