import React from 'react'
import {Link, useHistory} from 'react-router-dom'

const NotFound = () => (
  <div className="topfix">
    <h1> 404 - NotFound! </h1>
    <Link to="/">
      サイトトップに戻る
    </Link>
  </div>
)

export {NotFound}
