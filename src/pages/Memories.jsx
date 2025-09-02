import coffee from '../assets/macchiato.png'

function Memories() {
    const memories = [
      {
        id: 1,
        thumbnail: coffee,
        title: "The Bar",
        date: new Date("2025-03-18"),
      },
      {
        id: 2,
        thumbnail: coffee,
        title: "Oris Place",
        date: new Date("2025-03-18"),
      },
      {
        id: 3,
        thumbnail: coffee,
        title: "Picnic",
        date: new Date("2025-03-18"),
      },
      {
        id: 4,
        thumbnail: coffee,
        title: "Cycling",
        date: new Date("2025-03-18"),
      },
    ];

    return (
    <div className="text-3xl flex flex-col text-slate-400 p-5 gap-10">
        <div className='flex justify-center items-center'>
            <h1 className="text-center font-bold">Memories</h1>
            <button className='absolute right-4 text-lg p-2 rounded-xl'>Add</button>
        </div>
        <div className='w-full'>
            <input type='text' className='w-full border-2 rounded-lg p-2 text-xl' placeholder='Search Memory'/>
        </div>
        <div className='grid grid-cols-2 gap-5'>
            {memories.map(mem => (
                <div className='col-span-1' key={mem.id}>
                    <img src={mem.thumbnail} className='rounded-xl'/>
                    <div>
                        <h2 className='text-lg'>{mem.date.toLocaleDateString()}</h2>
                        <h2 className='text-2xl font-bold'>{mem.title}</h2>
                    </div>
                </div>
            ))}
        </div>

    </div>
    )
}

export default Memories