import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const analysis = await prisma.promptAnalysis.findUnique({
      where: { id, isPublic: true },
      include: {
        user: {
          select: { username: true }
        }
      }
    })

    if (!analysis) {
      return NextResponse.json({ error: 'Analysis not found or not public' }, { status: 404 })
    }

    return NextResponse.json(analysis)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
