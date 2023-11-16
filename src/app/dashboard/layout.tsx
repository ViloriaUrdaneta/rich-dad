
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const layout = (props:Props) => {
    return (
        <div className=''>
            <main className='' >
                {props.children}
            </main>
        </div>
    )
}

export default layout
