import { FC, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { Link, useParams, useRouteMatch, useSelector } from 'umi'
import { homeRoutes } from '@/config/routes'
import t from '@/utils/t'
import useRequest from '@/hooks/useRequest'

type CrumbType = {
  id: number
  pid: number
  path: string
  label: string
}

type Props = {
  suffix?: string
  titles?: {
    [key: string | number]: string
  }
}

const { Item } = Breadcrumb

const getCrumbs = (): CrumbType[] =>
  homeRoutes.map(({ path, breadcrumbLabel, pid = 0, id = 0 }) => ({
    path,
    label: breadcrumbLabel,
    pid,
    id,
  }))

function getCrumbItems(path: string, crumbs: CrumbType[]) {
  const crumb = crumbs.find((crumb) => crumb.path === path)
  if (!(crumb && crumb.id)) {
    return []
  }
  return loop(crumb.id, crumbs)
}

function loop(id = 1, crumbs: CrumbType[]): CrumbType[] {
  const current = crumbs.find((crumb) => crumb.id === id)
  if (!current) {
    return []
  }
  if (current && current?.pid > 0) {
    return [...loop(current.pid, crumbs), current]
  } else {
    return [current]
  }
}

const Breadcrumbs: FC<Props> = ({ suffix = '', titles = {} }) => {
  const { path } = useRouteMatch()
  const params = useParams<{ id: string; [key: string | number]: string }>()
  const project = useSelector(({ project }) => project.projects[params.id])
  const { run: getProject } = useRequest<YModels.Project, [{ id: string }]>('project/getProject', {
    cacheKey: 'getProject',
    loading: false,
  })
  const crumbs = getCrumbs()
  const crumbItems = getCrumbItems(path, crumbs)
  const isProjectDetail = (crumb: CrumbType) => crumb.id === 24
  const datasetList = crumbs.find(({ id }) => id === 32)

  useEffect(() => {
    setTimeout(() => {
      if (crumbItems.some(isProjectDetail) && params.id) {
        getProject({ id: params.id })
      }
    }, 500)
  }, [params.id])

  const getLabel = (crumb: CrumbType, customTitle: string) => {
    return (project && (isProjectDetail(crumb) ? project?.name : customTitle)) || t(crumb.label)
  }
  return (
    <div className="breadcrumb">
      <Breadcrumb className="breadcrumbContent" separator="/">
        {crumbItems.map((crumb, index) => {
          const last = index === crumbItems.length - 1
          const link = (isProjectDetail(crumb) ? datasetList?.path : crumb.path)?.replace(/:([^\/]+)/g, (str, key: number) => {
            return params[key] ? params[key] : ''
          })
          const label = getLabel(crumb, titles[index])
          return (
            <Item key={crumb.path}>
              {last ? (
                <span>
                  {label} {suffix}
                </span>
              ) : (
                <Link to={link}>{label}</Link>
              )}
            </Item>
          )
        })}
      </Breadcrumb>
    </div>
  )
}

export default Breadcrumbs
