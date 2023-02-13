
export interface IFilter {
        // toggleFilter: () => void
        filterName: string
        setFilterName: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ setFilterName }: IFilter) => {
    return (
        <fieldset className="Filter">
            <div className="Filter-Wrapper">
                <h1>Filter by: </h1>
                <label className="Filter-Label">
                    <input className="Filter-Box" type="radio" onClick={() => {
                        setFilterName('Year-Old-New')}} name="Filter-Option" value="Year-Old-New" />Year (oldest to newest)
                </label>
                <label className="Filter-Label">
                    <input className="Filter-Box" type="radio" onClick={() => {
                        setFilterName('Year-New-Old')}} name="Filter-Option" value="Year-New-Old"  />Year (newest to oldest)
                </label>
                <label className="Filter-Label">
                    <input className="Filter-Box" type="radio" onClick={() => {
                        setFilterName('Artist')}} name="Filter-Option" value="Artist"  />Artist
                </label>
                <label className="Filter-Label">
                    <input className="Filter-Box" type="radio" onClick={() => {
                        setFilterName('Title')}}name="Filter-Option" value="Title"  />Title
                </label>
            </div>

        </fieldset>

    )
}

export default Filter;
