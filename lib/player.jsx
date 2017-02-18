import React, {Component} from 'react'

export default
class VideoPlayer extends Component {
  constructor() {
    super()
    this.setCurrentTime = this.setCurrentTime.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps)
  }

  setCurrentTime(e) {
    const currentTime = e.target.currentTime
    const minutes = Math.floor(currentTime / 60)
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes
    const seconds = Math.floor(currentTime - (minutes * 60))
    const secondsFormatted = seconds < 10 ?  `0${seconds}` : seconds
    this.props.setTimer(`${minutesFormatted}:${secondsFormatted}`)
  }

  componentDidUpdate() {
    this.video.load()
    this.video.play()
  }

  render() {
    return (
      <video
        ref={(ref) => { this.video = ref }}
        onLoadedMetadata={(e) => this.props.changeDuration(e.target.duration)}
        onTimeUpdate={this.setCurrentTime}
        preload="auto" height="264">
        <source src={`${this.props.videoBlob}#t=${this.props.start},${this.props.end}`} type="video/mp4" />
      </video>
    )
  }
}
