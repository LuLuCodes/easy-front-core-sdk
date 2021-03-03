import { BaseMsg } from '../BaseMsg'

/**
 * @description 通讯录事件
 */

export class InUpdateUser extends BaseMsg {
  public static INFO_TYPE: string = 'change_contact'

  private suiteid: string
  private authcorpid: string
  private infotype: string
  private timestamp: number
  private changetype: string
  private userid: string
  private openuserid: string
  private newuserid: string
  private name: string
  private department: string
  private mainDepartment: string
  private isLeaderInDept: string
  private position: string
  private mobile: number
  private gender: number
  private email: string
  private status: number
  private avatar: string
  private alias: string
  private telephone: string
  private extAttr: []

  constructor(
    suiteId: string,
    authCorpId: string,
    infoType: string,
    timeStamp: number,
    changeType: string,
    userId: string,
    openUserId: string,
    newUserId: string,
    name: string,
    department: string,
    mainDepartment: string,
    isLeaderInDept: string,
    position: string,
    mobile: number,
    gender: number,
    email: string,
    status: number,
    avatar: string,
    alias: string,
    telephone: string,
    extAttr: []
  ) {
    super()
    this.suiteid = suiteId
    this.authcorpid = authCorpId
    this.infotype = infoType
    this.timestamp = timeStamp
    this.changetype = changeType
    this.userid = userId
    this.openuserid = openUserId
    this.newuserid = newUserId
    this.name = name
    this.department = department
    this.mainDepartment = mainDepartment
    this.isLeaderInDept = isLeaderInDept
    this.position = position
    this.mobile = mobile
    this.gender = gender
    this.email = email
    this.status = status
    this.avatar = avatar
    this.alias = alias
    this.telephone = telephone
    this.extAttr = extAttr
  }

  public get suiteId(): string {
    return this.suiteid
  }

  public set suiteId(suiteId: string) {
    this.suiteid = suiteId
  }

  public get authCorpId(): string {
    return this.authcorpid
  }

  public set authCorpId(authCorpId: string) {
    this.authcorpid = authCorpId
  }

  public get infoType(): string {
    return this.infotype
  }

  public set infoType(infoType: string) {
    this.infotype = infoType
  }

  public get timeStamp(): number {
    return this.timestamp
  }

  public set timeStamp(timeStamp: number) {
    this.timestamp = timeStamp
  }

  public get changeType(): string {
    return this.changetype
  }

  public set changeType(changeType: string) {
    this.changetype = changeType
  }

  public get userId(): string {
    return this.userid
  }

  public set userId(userId: string) {
    this.userid = userId
  }

  public get openUserId(): string {
    return this.openuserid
  }

  public set openUserId(openuserid: string) {
    this.openuserid = openuserid
  }

  public get newUserId(): string {
    return this.newuserid
  }

  public set newUserId(newuserid: string) {
    this.newuserid = newuserid
  }

  public get getName(): string {
    return this.name
  }

  public set setName(name: string) {
    this.name = name
  }

  public get getDepartment(): string {
    return this.department
  }

  public set setDepartment(department: string) {
    this.department = department
  }

  public get getMainDepartment(): string {
    return this.mainDepartment
  }

  public set setMainDepartment(mainDepartment: string) {
    this.mainDepartment = mainDepartment
  }

  public get getIsLeaderInDept(): string {
    return this.isLeaderInDept
  }

  public set setIsLeaderInDept(isLeaderInDept: string) {
    this.isLeaderInDept = isLeaderInDept
  }

  public get getPosition(): string {
    return this.position
  }

  public set setPosition(position: string) {
    this.position = position
  }

  public get getMobile(): number {
    return this.mobile
  }

  public set setMobile(mobile: number) {
    this.mobile = mobile
  }

  public get getGender(): number {
    return this.gender
  }

  public set setGender(gender: number) {
    this.gender = gender
  }

  public get getEmail(): string {
    return this.email
  }

  public set setEmail(email: string) {
    this.email = email
  }

  public get getStatus(): number {
    return this.status
  }

  public set setStatus(status: number) {
    this.status = status
  }

  public get getAvatar(): string {
    return this.avatar
  }

  public set setAvatar(avatar: string) {
    this.avatar = avatar
  }

  public get getAlias(): string {
    return this.alias
  }

  public set setAlias(alias: string) {
    this.alias = alias
  }

  public get getTelephone(): string {
    return this.telephone
  }

  public set setTelephone(telephone: string) {
    this.telephone = telephone
  }

  public get getExtAttr(): [] {
    return this.extAttr
  }

  public set setExtAttr(extAttr: []) {
    this.extAttr = extAttr
  }
}
