import SingleArtists from "./SingleArtists";

export interface IRec {
    handleClick: React.MouseEventHandler<HTMLDivElement> 
}

const RecArtists: React.FC<IRec> = ({ handleClick }) => {

    return (
        <div className="Rec-Artists-Wrapper">
            <div className="Rec-Artists-Title">
                <SingleArtists name="Vincent van Gogh" setName="Vincent van Gogh" img="https://www.vincentvangogh.org/images/self-portrait.jpg" onClick={handleClick} />
                <SingleArtists name="Johannes Vermeer" setName="Johannes Vermeer" img="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/211px-1665_Girl_with_a_Pearl_Earring.jpg" onClick={handleClick}/>
                <SingleArtists name="Eugène Delacroix" setName="Eugène Delacroix" img="https://upload.wikimedia.org/wikipedia/commons/9/9d/Eugene_delacroix.jpg" onClick={handleClick}/>
                <SingleArtists name="Georges Seurat" setName="Georges Seurat" img="https://uploads6.wikiart.org/images/georges-seurat.jpg!Portrait.jpg" onClick={handleClick}/>
            </div>
        </div>
    )

}

export default RecArtists;