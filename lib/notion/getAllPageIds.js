export default function getAllPageIds (collectionQuery, collectionId, collectionView, viewIds) {
  if (!collectionQuery && !collectionView) {
    return []
  }
  let pageIds = []

  // Try to get from the first view
  try {
    if (viewIds && viewIds.length > 0) {
      const firstView = collectionQuery[collectionId]?.[viewIds[0]]
      const ids = firstView?.collection_group_results?.blockIds || firstView?.blockIds
      if (ids) {
        for (const id of ids) {
          pageIds.push(id)
        }
      }
    }
  } catch (error) {
    console.error('Error fetching page IDs:', error)
  }

  // Fallback: get from all views
  if (pageIds.length === 0 && collectionQuery && Object.keys(collectionQuery).length > 0) {
    const pageSet = new Set()
    const views = collectionQuery[collectionId] || {}
    
    for (const view of Object.values(views)) {
      if (!view) continue;
      
      // Traverse keys in the view to find blockIds
      for (const [key, value] of Object.entries(view)) {
        if (key === 'blockIds' && Array.isArray(value)) {
          value.forEach(id => pageSet.add(id))
        } else if (value && value.blockIds && Array.isArray(value.blockIds)) {
          value.blockIds.forEach(id => pageSet.add(id))
        }
      }
    }
    pageIds = [...pageSet]
  }
  
  return pageIds
}
