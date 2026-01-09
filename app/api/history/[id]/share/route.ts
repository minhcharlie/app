import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const { isPublic } = await request.json()

    const analysis = await prisma.promptAnalysis.update({
      where: { id, userId: user.userId },
      data: { isPublic }
    })

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Share toggle error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
