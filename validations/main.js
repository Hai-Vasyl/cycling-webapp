export class Validation {
  constructor(value) {
    this.value = value
    this.msg = ''
  }
  makeMsg(msg) {
    this.msg += ` ${msg}`
    this.msg = this.msg.trim()
  }
  isEmpty(args){
    if(!this.value.trim()){
      this.makeMsg(args.msg?.trim() ? args.msg : "This field cannot be empty!" )
    }
    return this
  }
  isEmail(args) {
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if(!this.value.match(pattern)){
      this.makeMsg(args.msg?.trim() ? args.msg : "Email is not correct!")
    }
    return this
  }
  isLess(args){
    if(this.value.length >= args.value){
      this.makeMsg(args.msg?.trim() ? args.msg : `This field must be less than ${args.value} characters!`)
    }
    return this
  }
  isLonger(args){
    if(this.value.length <= args.value){
      this.makeMsg(args.msg?.trim() ? args.msg : `This field must be longer than ${args.value} characters!`)
    }
    return this
  }
}
