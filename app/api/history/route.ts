import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const user = await getAuthUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const history = await prisma.promptAnalysis.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(history)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const analysis = await prisma.promptAnalysis.create({
      data: {
        ...data,
        userId: user.userId
      }
    })
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Save history error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
