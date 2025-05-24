export default function ProjectCard({ title, description, img }) {
    return (
      <article className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
        <img src={img} alt={title} className="h-48 w-full object-cover"/>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            View Repo
          </button>
        </div>
      </article>
    )
  }
  