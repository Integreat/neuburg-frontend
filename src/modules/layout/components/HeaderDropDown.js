import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import style from './HeaderDropDown.css'
import onClickOutside from 'react-onclickoutside'

/**
 * Designed to work as an item of a HeaderActionBar. Once clicked, the child node becomes visible right underneath the
 * Header. Once the user clicks outside, the node is hidden again. Additionally, the inner node gets a
 * closeDropDownCallback through its props to close the dropDown and hide itself.
 */
class HeaderDropDown extends React.Component {
  static propTypes = {
    iconSrc: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { dropDownActive: false }
    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.closeDropDown = this.closeDropDown.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  toggleDropDown () {
    this.setState(prevState => ({ dropDownActive: !prevState.dropDownActive }))
  }

  closeDropDown () {
    if (this.state.dropDownActive) {
      this.toggleDropDown()
    }
  }

  handleClickOutside () {
    this.closeDropDown()
  }

  render () {
    return (
      <span>
        <img src={this.props.iconSrc} onClick={this.toggleDropDown} />
        <div className={cx(style.dropDown, this.state.dropDownActive ? style.dropDownActive : '')}>
          {/* Pass dropDownCallback to child element */}
          {React.cloneElement(this.props.children, { closeDropDownCallback: this.closeDropDown })}
        </div>
      </span>
    )
  }
}

export default onClickOutside(HeaderDropDown)
