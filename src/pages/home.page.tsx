import React from 'react'
import BadgedButton from '../components/badgeButton'

const HomePage = () => {
  return (
    <div>
      <h2 className='text-xl font-semibold'>Task management</h2>
      <div>
        <ul>
          <li>
            <BadgedButton active>All</BadgedButton>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HomePage
