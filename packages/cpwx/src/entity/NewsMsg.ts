import { BaseMsg } from './BaseMsg'
import { MessageType } from '../Enums'

/**
 * @description 图文消息
 */
export class NewsMsg extends BaseMsg {
  private news: Articles

  constructor(
    news: Articles,
    agentId?: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(MessageType.NEWS, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.news = news
  }

  public get getNews(): Articles {
    return this.news
  }

  public set setNews(news: Articles) {
    this.news = news
  }
}

export class Articles {
  private articles: Array<News>

  constructor(articles: Array<News>) {
    this.articles = articles
  }

  public set setArticles(articles: Array<News>) {
    this.articles = articles
  }

  public get getArticles(): Array<News> {
    return this.articles
  }
}

export class News {
  private title: string
  private description: string
  private picurl: string
  private url: string

  constructor(title: string, description: string, picUrl: string, url: string) {
    this.title = title
    this.description = description
    this.picurl = picUrl
    this.url = url
  }

  public get getTitle(): string {
    return this.title
  }

  public set setTitle(title: string) {
    this.title = title
  }

  public get getDescription(): string {
    return this.description
  }

  public set setDescription(description: string) {
    this.description = description
  }

  public get picUrl(): string {
    return this.picurl
  }

  public set picUrl(picUrl: string) {
    this.picurl = picUrl
  }

  public get getUrl(): string {
    return this.url
  }

  public set setUrl(url: string) {
    this.url = url
  }
}
