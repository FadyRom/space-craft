export interface PICTURE_OF_THE_DAY {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface COLLECTION {
  data: {}[];
  href: String;
  links: {
    height: number;
    href: string;
    rel: string;
    render: string;
    size: number;
    width: number;
  }[];
}

export interface COLLECTION_LINKS {
  height: number;
  href: string;
  rel: string;
  render: string;
  size: number;
  width: number;
}

export interface COLLECTION_DATA {
  center: string;
  date_created: string;
  description: string;
  media_type: string;
  nasa_id: string;
  title: string;
}

export interface COLLECTION_LINKS_DATA {
  collectionLinks: COLLECTION_LINKS;
  collectionData: COLLECTION_DATA;
}
