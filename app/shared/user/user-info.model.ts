export class UserInfo {
  id: number
  type: string
  name: string
  surname: string
  email: string
  image: string
  isFilled: boolean

  constructor(user) {
    if (user.id) {
      this.id = user.id
      this.type = user.userable_type.replace('App\\Models\\', '').toLowerCase()
      this.name = user.name
      this.surname = user.surname
      this.email = user.email
      this.image = user.image
      this.isFilled = !!user.is_filled
    }
  }
}
