import { useState } from 'react'
import { ReactReader } from 'react-reader'

export const BookReader = () => {
  const [location, setLocation] = useState<string | number>(0)
  const locationChanged = (epubcfi: string) => setLocation(epubcfi)
  return (
    <div style={{ height: '80vh' }}>
      <ReactReader
        url="https://react-reader.metabits.no/files/alice.epub"
        location={location}
        locationChanged={locationChanged}
      />
    </div>
  )
}

export default BookReader